export type Step = 0 | 1;       // 0-5: from 报名 to 通过

export interface User {
    _id: string;
    name: string;
    step: Step;
    answer: string;
}

export interface Time {
    date: number;
    morning: number;
    afternoon: number;
    evening: number;
}

export interface Question {
    content: string;
    selections: string[];
}

export interface Schedule {
    notification: string;
    event: {
        start: number;
        end: number;
    };
    concert: {
        start: number;
        end: number;
    };
    fundraising: {
        start: number;
        end: number;
    };
    purchasing: {
        start: number;
        end: number;
    }
}

export interface Offline {
    description: string,
    image: string
}

export interface Star {
    _id: string;
    name: string;
    begin: number;
    end: number;
    stop: number;
    total: number;
    interview: Time[];
}
