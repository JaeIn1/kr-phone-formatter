import { useState, useCallback } from 'react';

// src/useKrPhoneFormatter.ts
function useKrPhoneFormatter(initialValue = "") {
    // 초기값 포맷팅
    const initialFormattedValue = formatKrPhoneNumber(initialValue);
    // 포맷된 값 (input에 표시될 값)
    const [formattedValue, setFormattedValue] = useState(initialFormattedValue);
    const handleChange = useCallback((event) => {
        const rawInput = event.target.value;
        const newFormattedValue = formatKrPhoneNumber(rawInput);
        // 상태 업데이트
        setFormattedValue(newFormattedValue);
    }, []);
    const setValue = useCallback((newValue) => {
        setFormattedValue(formatKrPhoneNumber(newValue));
    }, []);
    return {
        value: formattedValue,
        onChange: handleChange,
        rawValue: extractNumber(formattedValue), // 숫자만 추출해서 제공
        setValue,
    };
}

/**
 * 한국 전화번호를 입력받아 실시간으로 하이픈 포맷을 적용하는 핵심 함수입니다.
 * @param value - 입력된 문자열 (하이픈, 공백 등 포함 가능)
 * @returns 포맷이 적용된 문자열
 */
function formatKrPhoneNumber(value) {
    // 1. 숫자만 추출: 입력값에서 숫자 외 모든 문자 제거
    const cleaned = value.replace(/[^0-9]/g, "");
    // 입력된 숫자가 없으면 빈 문자열 반환
    if (!cleaned)
        return "";
    const len = cleaned.length;
    // 2. 010 (휴대폰, 11자리) 처리
    if (cleaned.startsWith("010") && len <= 11) {
        if (len <= 3)
            return cleaned;
        if (len <= 7)
            return `${cleaned.substring(0, 3)}-${cleaned.substring(3, len)}`;
        // 010-XXXX-XXXX 포맷 (11자리)
        return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 7)}-${cleaned.substring(7, 11)}`;
    }
    // 3. 02 (서울 지역번호, 9~10자리) 처리
    if (cleaned.startsWith("02") && len <= 10) {
        if (len <= 2)
            return cleaned; // '02'
        // 02로 시작하고 총 길이가 9자리 이하일 때 (02-XXX-XXXX 또는 02-XX-XXXX)
        if (len <= 6) {
            return `${cleaned.substring(0, 2)}-${cleaned.substring(2, len)}`; // 02-XX(X)
        }
        // 9자리 포맷 (02-XXX-XXXX)
        if (len === 9) {
            return `${cleaned.substring(0, 2)}-${cleaned.substring(2, 5)}-${cleaned.substring(5, 9)}`;
        }
        // 10자리 포맷 (02-XXXX-XXXX)
        return `${cleaned.substring(0, 2)}-${cleaned.substring(2, 6)}-${cleaned.substring(6, 10)}`;
    }
    // 4. 기타 지역번호 (03X, 05X 등, 10~11자리) 처리
    if (len <= 3)
        return cleaned; // 0XX
    // 국번(3자리)까지 입력된 경우 (0XX-XXX)
    if (len <= 7) {
        return `${cleaned.substring(0, 3)}-${cleaned.substring(3, len)}`;
    }
    // 10자리 포맷 (0XX-XXX-XXXX)
    if (len <= 10) {
        return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 6)}-${cleaned.substring(6, len)}`;
    }
    // 11자리 포맷 (0XX-XXXX-XXXX)
    // 03112345678 (11자리)
    return `${cleaned.substring(0, 3)}-${cleaned.substring(3, 7)}-${cleaned.substring(7, 11)}`;
}
/**
 * 포맷된 문자열에서 숫자만 추출하는 함수
 * @param formattedValue - 하이픈 등 특수문자가 포함된 문자열
 * @returns 숫자만 남은 문자열
 */
function extractNumber(formattedValue) {
    return formattedValue.replace(/[^0-9]/g, "");
}

export { extractNumber, formatKrPhoneNumber, useKrPhoneFormatter };
//# sourceMappingURL=index.esm.js.map
