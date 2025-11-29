// src/useKrPhoneFormatter.ts

import { useState, useCallback } from "react";
import { formatKrPhoneNumber, extractNumber } from "./index"; // 앞서 만든 핵심 함수 import

interface useKrPhoneFormatterProps {
  value: string; // 현재 인풋에 표시되어야 할 포맷된 전화번호
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // <input>의 onChange 핸들러에 바로 연결할 수 있는 함수
  rawValue: string; // 포맷되지 않은 순수 숫자 문자열
  setValue: (newValue: string) => void; // 외부에서 값을 설정하기 위한 함수
}

export function useKrPhoneFormatter(initialValue: string = ""): useKrPhoneFormatterProps {
  // 초기값 포맷팅
  const initialFormattedValue = formatKrPhoneNumber(initialValue);

  // 포맷된 값 (input에 표시될 값)
  const [formattedValue, setFormattedValue] = useState(initialFormattedValue);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value;
    const newFormattedValue = formatKrPhoneNumber(rawInput);

    // 상태 업데이트
    setFormattedValue(newFormattedValue);
  }, []);

  const setValue = useCallback((newValue: string) => {
    setFormattedValue(formatKrPhoneNumber(newValue));
  }, []);

  return {
    value: formattedValue,
    onChange: handleChange,
    rawValue: extractNumber(formattedValue), // 숫자만 추출해서 제공
    setValue,
  };
}
