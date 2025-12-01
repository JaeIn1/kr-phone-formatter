import { describe, it, expect } from "vitest";
import { formatKrPhoneNumber, extractNumber } from "../index";

// formatKrPhoneNumber 함수 테스트
describe("formatKrPhoneNumber 함수 테스트", () => {
  // 1.1. 성공 케이스: 휴대폰 번호 (010, 11자리)
  it("010 (11자리) 번호를 010-XXXX-XXXX 형식으로 포맷해야 한다", () => {
    expect(formatKrPhoneNumber("01012345678")).toBe("010-1234-5678");
  });

  // 1.2. 성공 케이스: 서울 지역번호 (02, 10자리)
  it("02 (10자리) 번호를 02-XXXX-XXXX 형식으로 포맷해야 한다", () => {
    // 예: 0212345678 (10자리)
    expect(formatKrPhoneNumber("0212345678")).toBe("02-1234-5678");
  });

  // 1.3. 엣지 케이스: 서울 지역번호 (02, 9자리)
  it("02 (9자리) 번호를 02-XXX-XXXX 형식으로 포맷해야 한다", () => {
    // 예: 021234567 (9자리)
    expect(formatKrPhoneNumber("021234567")).toBe("02-123-4567");
  });

  // 1.4. 부분 입력 테스트 (UX 검증)
  it("부분 입력 시에도 UX 포맷을 정확히 유지해야 한다", () => {
    expect(formatKrPhoneNumber("010")).toBe("010");
    expect(formatKrPhoneNumber("0101234")).toBe("010-1234");
    expect(formatKrPhoneNumber("02123")).toBe("02-123");
    expect(formatKrPhoneNumber("0311")).toBe("031-1");
  });

  // 1.5. 특수문자 및 공백 처리 (Cleaning Logic 검증)
  it("하이픈이나 괄호 등 숫자가 아닌 문자를 제거하고 포맷해야 한다", () => {
    // 이미 하이픈과 괄호가 섞여 있어도 최종적으로 깨끗하게 포맷되어야 함.
    expect(formatKrPhoneNumber("(010) 1234-5678")).toBe("010-1234-5678");
  });

  // 1.6. 최대 길이 초과 (12자 이상)
  it("최대 11자리까지만 포맷하고 나머지 숫자는 잘라내야 한다", () => {
    // 010 번호는 11자리까지만 포맷되어야 함.
    expect(formatKrPhoneNumber("01012345678999")).toBe("010-1234-5678");
  });
});

// extractNumber 함수 테스트
describe("extractNumber 함수 테스트", () => {
  it("포맷된 문자열에서 모든 숫자가 아닌 문자를 제거해야 한다", () => {
    expect(extractNumber("010-1234-5678")).toBe("01012345678");
    expect(extractNumber("02)1234-5678")).toBe("0212345678");
    expect(extractNumber("Test123Test")).toBe("123");
  });
});
