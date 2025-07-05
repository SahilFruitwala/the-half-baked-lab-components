"use client";

import { useState, useEffect } from "react";
import { Card } from "@/registry/new-york/ui/card";

interface TimeRemaining {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    totalSeconds: number;
}

interface YearProgressProps {
    className?: string;
    showHeader?: boolean;
    showCountDown?: boolean;
    showProgress?: boolean;
    showDaysRemaining?: boolean;
}

export function YearProgress({
    className = "",
    showHeader = true,
    showCountDown = true,
    showProgress = true,
    showDaysRemaining = true,
}: YearProgressProps) {
    const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(
        null
    );
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const calculateTimeRemaining = (): TimeRemaining => {
        try {
            const now = new Date();
            const currentYear = now.getFullYear();
            const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);

            const difference = newYear.getTime() - now.getTime();

            if (difference <= 0) {
                // Handle year transition
                const nextYear = new Date(currentYear + 2, 0, 1, 0, 0, 0);
                const nextDifference = nextYear.getTime() - now.getTime();

                return {
                    days: Math.floor(nextDifference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor(
                        (nextDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    ),
                    minutes: Math.floor(
                        (nextDifference % (1000 * 60 * 60)) / (1000 * 60)
                    ),
                    seconds: Math.floor((nextDifference % (1000 * 60)) / 1000),
                    totalSeconds: Math.floor(nextDifference / 1000),
                };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                ),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000),
                totalSeconds: Math.floor(difference / 1000),
            };
        } catch (err) {
            throw new Error("Failed to calculate time remaining");
        }
    };

    const getTargetYear = (): number => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const newYear = new Date(currentYear + 1, 0, 1, 0, 0, 0);

        return newYear.getTime() - now.getTime() <= 0
            ? currentYear + 2
            : currentYear + 1;
    };

    useEffect(() => {
        const updateCountdown = () => {
            try {
                const remaining = calculateTimeRemaining();
                setTimeRemaining(remaining);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "An error occurred");
            }
        };

        // Initial calculation
        updateCountdown();
        setIsLoaded(true);

        // Update every second
        const interval = setInterval(updateCountdown, 1000);

        // Cleanup
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return (
            <Card className="border-red-200 bg-red-50 p-8 text-center dark:border-red-800 dark:bg-red-950">
                <div className="font-mono text-lg text-red-600 dark:text-red-400">
                    ERROR: {error}
                </div>
            </Card>
        );
    }

    if (!isLoaded || !timeRemaining) {
        return (
            <Card className="countdown-card countdown-border border-2 p-8 text-center">
                <div className="countdown-primary countdown-pulse font-mono text-lg">
                    INITIALIZING COUNTDOWN...
                </div>
            </Card>
        );
    }

    const targetYear = getTargetYear();
    const progressPercentage = Math.max(
        0,
        100 - (timeRemaining.totalSeconds / (365 * 24 * 60 * 60)) * 100
    );

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            {showHeader && (
                <Card className="countdown-border border-2 bg-gradient-to-r from-orange-500 to-orange-600 p-6 shadow-lg dark:from-orange-600 dark:to-orange-700">
                    <h1 className="text-center font-mono text-2xl font-bold tracking-wider text-white drop-shadow-sm md:text-3xl">
                        COUNTDOWN TO {targetYear}
                    </h1>
                </Card>
            )}

            {/* Main Countdown Display */}
            {showCountDown && (
                <Card className="countdown-card countdown-border border-2 p-8 shadow-2xl">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
                        {[
                            { value: timeRemaining.days, label: "DAYS" },
                            { value: timeRemaining.hours, label: "HOURS" },
                            { value: timeRemaining.minutes, label: "MINUTES" },
                            { value: timeRemaining.seconds, label: "SECONDS" },
                        ].map((item, index) => (
                            <div key={item.label} className="text-center">
                                <div className="relative">
                                    <div className="countdown-primary countdown-glow mb-2 font-mono text-4xl font-bold transition-all duration-300 hover:scale-105 md:text-6xl">
                                        {item.value.toString().padStart(2, "0")}
                                    </div>
                                    <div className="countdown-text font-mono text-sm tracking-widest md:text-base">
                                        {item.label}
                                    </div>
                                    {/* Enhanced glow effect */}
                                    <div className="countdown-secondary pointer-events-none absolute inset-0 font-mono text-4xl font-bold opacity-10 blur-sm md:text-6xl">
                                        {item.value.toString().padStart(2, "0")}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Progress Bar */}
            {showProgress && (
                <Card className="p-6 countdown-card border-2 countdown-border shadow-lg">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="countdown-text font-mono text-sm">
                                YEAR PROGRESS
                            </span>
                            <span className="countdown-primary font-mono text-sm font-bold">
                                {progressPercentage.toFixed(1)}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-4 overflow-hidden border-2 countdown-border">
                            <div
                                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-400 transition-all duration-500 ease-out relative"
                                style={{ width: `${progressPercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-orange-300 dark:bg-orange-300 opacity-30 animate-pulse"></div>
                            </div>
                        </div>
                        <div className="text-center countdown-text font-mono text-xs">
                            TIME REMAINING UNTIL NEW YEAR
                        </div>
                    </div>
                </Card>
            )}

            {/* Status Message */}
            {showDaysRemaining && (
                <Card className="countdown-card countdown-border border p-4 shadow-md">
                    <div className="countdown-text text-center font-mono text-sm">
                        {timeRemaining.totalSeconds > 86400
                            ? `${Math.floor(
                                timeRemaining.totalSeconds / 86400
                            )} days remaining in ${new Date().getFullYear()}`
                            : timeRemaining.totalSeconds > 3600
                                ? `Less than 24 hours remaining in ${new Date().getFullYear()}!`
                                : timeRemaining.totalSeconds > 60
                                    ? `Final hour of ${new Date().getFullYear()}!`
                                    : `Final minute of ${new Date().getFullYear()}!`}
                    </div>
                </Card>
            )}
        </div>
    );
}
