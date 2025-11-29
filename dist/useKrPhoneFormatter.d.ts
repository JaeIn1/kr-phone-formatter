interface useKrPhoneFormatterProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    rawValue: string;
    setValue: (newValue: string) => void;
}
export declare function useKrPhoneFormatter(initialValue?: string): useKrPhoneFormatterProps;
export {};
