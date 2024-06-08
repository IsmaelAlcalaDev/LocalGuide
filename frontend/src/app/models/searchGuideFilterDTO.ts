export interface SearchGuideFilterDTO {
    country: string;
    city: string;
    languages: string[];
    hobbies: string[];
    minPrice: number;
    maxPrice: number;
    gender: string;
    averageRating: number;
    totalReservations: number;
}