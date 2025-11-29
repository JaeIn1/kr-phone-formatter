# kr-phone-formatter

한국 전화번호 입력에 최적화된 초경량 포맷터입니다.

010, 02(서울), 03x/05x(지역번호) 등 한국의 모든 유무선 전화번호 형식을 실시간으로 자동 완성해줍니다.  
React 환경을 위한 Hook (`useKrPhoneFormatter`)을 제공하여 손쉽게 사용할 수 있습니다.

## ✨ 특징 (Features)

- **한국 전화번호 형식 완벽 지원**: 010, 02, 031~064 등 모든 국내 번호 형식
- **초경량**: 번들 크기 최소화
- **타입 안전**: TypeScript 지원
- **React Hook 제공**: `useKrPhoneFormatter`로 즉시 사용
- **프레임워크 독립적**: React, Vue, Node.js 등 어디서든 사용 가능

---

## 🚀 설치 (Installation)

```bash
npm install kr-phone-formatter
# 또는
yarn add kr-phone-formatter
```

---

## 📚 사용법 (Usage)

### 1. 순수 함수 사용

모든 JavaScript 환경에서 사용 가능한 핵심 함수입니다.

#### `formatKrPhoneNumber(value: string): string`

전화번호 문자열을 받아 자동으로 포맷팅합니다.

```javascript
import { formatKrPhoneNumber } from "kr-phone-formatter";

// 휴대폰 번호 (010)
formatKrPhoneNumber("01012345678"); // '010-1234-5678'
formatKrPhoneNumber("010123"); // '010-123' (입력 중)

// 서울 지역번호 (02)
formatKrPhoneNumber("0212345678"); // '02-1234-5678' (10자리)
formatKrPhoneNumber("021235678"); // '02-123-5678' (9자리)

// 일반 지역번호 (03x, 05x, 06x 등)
formatKrPhoneNumber("03112345678"); // '031-1234-5678' (11자리)
formatKrPhoneNumber("0511235678"); // '051-123-5678' (10자리)
```

#### `extractNumber(formattedValue: string): string`

포맷된 문자열에서 순수 숫자만 추출합니다. (API 전송 시 유용)

```javascript
import { extractNumber } from "kr-phone-formatter";

extractNumber("010-1234-5678"); // '01012345678'
extractNumber("(02) 1234-5678"); // '0212345678'
```

### 2. React Hook 사용 (React 권장)

React 프로젝트에서 실시간 포맷팅을 적용할 때 가장 편리한 방법입니다.

#### `useKrPhoneFormatter(initialValue?: string)`

```jsx
import React from "react";
import { useKrPhoneFormatter } from "kr-phone-formatter";

function PhoneInputForm() {
  const phone = useKrPhoneFormatter("010-1234");

  const handleSubmit = () => {
    // API 전송 시에는 rawValue 사용
    console.log("전송할 값:", phone.rawValue); // "0101234"
  };

  return (
    <div>
      <label>전화번호 입력</label>
      <input
        type="tel"
        placeholder="010-XXXX-XXXX"
        value={phone.value}
        onChange={phone.onChange}
        maxLength={13}
      />
      <button onClick={handleSubmit}>전송</button>
    </div>
  );
}

export default PhoneInputForm;
```

**Hook 반환 값:**

- `value`: 포맷된 전화번호 문자열
- `rawValue`: 하이픈이 제거된 순수 숫자 문자열
- `onChange`: input의 onChange에 바인딩할 핸들러

---

## 📚 API Reference

| 함수/Hook             | 파라미터                 | 반환값                          | 설명                          |
| --------------------- | ------------------------ | ------------------------------- | ----------------------------- |
| `formatKrPhoneNumber` | `value: string`          | `string`                        | 전화번호 문자열을 포맷팅      |
| `extractNumber`       | `formattedValue: string` | `string`                        | 포맷된 문자열에서 숫자만 추출 |
| `useKrPhoneFormatter` | `initialValue?: string`  | `{ value, rawValue, onChange }` | React Hook                    |

---


## 🐛 Issues

버그 제보나 기능 제안은 [GitHub Issues](https://github.com/your-username/kr-phone-formatter/issues)에서 해주세요.
