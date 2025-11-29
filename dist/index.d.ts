/**
 * 한국 전화번호를 입력받아 실시간으로 하이픈 포맷을 적용하는 핵심 함수입니다.
 * @param value - 입력된 문자열 (하이픈, 공백 등 포함 가능)
 * @returns 포맷이 적용된 문자열
 */
export declare function formatKrPhoneNumber(value: string): string;
/**
 * 포맷된 문자열에서 숫자만 추출하는 함수
 * @param formattedValue - 하이픈 등 특수문자가 포함된 문자열
 * @returns 숫자만 남은 문자열
 */
export declare function extractNumber(formattedValue: string): string;
export { useKrPhoneFormatter } from "./useKrPhoneFormatter";
