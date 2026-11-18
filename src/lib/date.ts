export default function FormatDate(date: string, withTime: boolean = false, monthYearOnly: boolean = false): string {
    const dateObj = new Date(date);
    
    // Validate date
    if (isNaN(dateObj.getTime())) {
        return 'Invalid Date';
    }

    if (monthYearOnly) {
        // Format hanya bulan dan tahun: "Oktober 2025"
        return dateObj.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long'
        });
    }

    if (withTime) {
        // Format dengan waktu: "12 Oktober 2025 - 14:30"
        const dateFormat = dateObj.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        return dateFormat.replace(/pukul\s*/i, "- ");
    } else {
        // Format tanpa waktu: "12 Oktober 2025"
        return dateObj.toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Helper functions untuk use cases yang umum
export function formatDateOnly(date: string): string {
    return FormatDate(date, false);
}

export function formatDateWithTime(date: string): string {
    return FormatDate(date, true);
}

export function formatMonthYear(date: string): string {
    return FormatDate(date, false, true);
}

// Format untuk relative time (opsional)
export function formatRelativeDate(date: string): string {
    const now = new Date();
    const dateObj = new Date(date);
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
        return 'Hari ini';
    } else if (diffInDays === 1) {
        return 'Kemarin';
    } else if (diffInDays < 7) {
        return `${diffInDays} hari yang lalu`;
    } else if (diffInDays < 30) {
        const weeks = Math.floor(diffInDays / 7);
        return `${weeks} minggu yang lalu`;
    } else if (diffInDays < 365) {
        const months = Math.floor(diffInDays / 30);
        return `${months} bulan yang lalu`;
    } else {
        const years = Math.floor(diffInDays / 365);
        return `${years} tahun yang lalu`;
    }
}