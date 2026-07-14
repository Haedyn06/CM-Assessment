import { HeroLogoQuote } from "@/components/ui/HeroLogo";

export type LogoItem = {
    id: string;
    src: string;
    alt: string;
    hoverColor: string;
    aspectRatio: number;
    hasQuote?: boolean;
    quote?: HeroLogoQuote;
}