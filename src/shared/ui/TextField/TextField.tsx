import { colors } from '@shared/config';
import { Box } from '@shared/ui/Box';
import { Typography } from '@shared/ui/Typography';
import React, { useRef } from 'react';
import {
  Platform,
  ScrollView,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type Props = {
  /** 필드 라벨 */
  label: string;
  /** 라벨 옆 필수 표시 여부 */
  required?: boolean;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 입력 값 */
  value: string;
  /** 입력 변경 핸들러 */
  onChangeText: (text: string) => void;
  /** 여러 줄 입력 여부 */
  multiline?: boolean;
  /** TextInput에 전달할 추가 prop */
  inputProps?: Omit<
    TextInputProps,
    'value' | 'onChangeText' | 'multiline' | 'placeholder'
  >;
  /** TextInput에 적용할 추가 클래스 */
  inputClassName?: string;
  /** TextInput ref (포커스 위치 계산 등 외부 제어용) */
  inputRef?: React.Ref<TextInput>;
  /** 스크롤 컨테이너 ref (포커스 시 자동 스크롤용) */
  scrollRef?: React.RefObject<ScrollView | null>;
};

/**
 * 공용 텍스트 입력 필드
 * - 라벨 + 하단 보더 형태의 입력 UI
 * - NativeWind 클래스로만 스타일 제어
 */
export function TextField({
  label,
  required,
  placeholder,
  value,
  onChangeText,
  multiline,
  inputProps,
  inputClassName,
  inputRef,
  scrollRef,
}: Props) {
  const containerRef = useRef<View>(null);
  const internalInputRef = useRef<TextInput>(null);

  /**
   * 외부에서 전달된 ref와 내부 ref를 연결하는 핸들러
   * - 내부적으로 measureLayout 등을 위해 ref가 필요함
   * - 동시에 외부에서 전달받은 ref도 제대로 연결해야 함
   * - ref는 함수형 또는 object형 둘 다 지원
   */
  const handleInputRef = (ref: TextInput) => {
    // 내부 ref에 저장 (measureLayout 등에서 사용)
    internalInputRef.current = ref;

    // 외부에서 ref를 전달했다면 그것도 연결
    if (inputRef) {
      if (typeof inputRef === 'function') {
        // 함수형 ref인 경우
        inputRef(ref);
      } else if (inputRef && 'current' in inputRef) {
        // object형 ref인 경우 (RefObject 또는 MutableRefObject)
        // deprecated MutableRefObject 대신 안전한 방식으로 할당
        (inputRef as { current: TextInput | null }).current = ref;
      }
    }
  };

  /**
   * TextField 포커스 시 처리하는 핸들러
   * Android에서 키보드가 나타날 때 TextField가 가려지지 않도록 자동 스크롤 처리
   */
  const handleFocus = (e: any) => {
    /*
     * 🤖 Android 키보드 자동 스크롤 처리
     *
     * 왜 필요한가?
     * - Android에서는 키보드가 나타나도 자동으로 스크롤되지 않아서
     *   TextField가 키보드에 가려질 수 있음
     * - iOS는 자동으로 처리되지만 Android는 수동으로 처리해야 함
     */
    if (
      Platform.OS === 'android' && // Android에서만 실행
      scrollRef?.current && // 스크롤 컨테이너가 있고
      containerRef.current // TextField 컨테이너도 있을 때
    ) {
      /*
       * 📱 멀티라인 vs 싱글라인 처리 차이
       * - 멀티라인: 키보드 + 텍스트 크기 변화가 복잡해서 더 긴 딜레이 필요
       * - 싱글라인: 상대적으로 단순해서 짧은 딜레이로 충분
       */
      const delay = multiline ? 400 : 300;

      // 🎬 애니메이션 프레임으로 부드러운 처리
      requestAnimationFrame(() => {
        // ⏰ 키보드 애니메이션이 완료될 때까지 대기
        setTimeout(() => {
          if (scrollRef.current) {
            /*
             * 📏 measureLayout: TextField의 정확한 화면상 위치를 측정
             * - containerRef.current: 측정할 요소 (우리 TextField)
             * - scrollRef.current: 기준점이 되는 스크롤 컨테이너
             * - 성공 콜백: (x, y, width, height) => { ... }
             * - 실패 콜백: () => { ... }
             */
            containerRef.current?.measureLayout(
              scrollRef.current as any, // 타입 오류 해결을 위한 캐스팅
              (_x, y, _width, _height) => {
                /*
                 * 🎯 스크롤 위치 계산
                 * - y: TextField의 화면상 Y 위치
                 * - offset: 키보드 위에 여유 공간 (멀티라인은 더 넓게)
                 * - scrollY: 실제로 스크롤할 Y 위치
                 */
                const offset = multiline ? 120 : 50; // 멀티라인일 때 더 많은 여유공간
                const scrollY = y - offset;

                // 📜 실제 스크롤 실행 (음수 방지)
                scrollRef.current?.scrollTo({
                  y: Math.max(0, scrollY),
                  animated: true,
                });
              },
              () => {
                /*
                 * 🚨 measureLayout 실패 시 안전장치
                 * - 정확한 위치 측정에 실패한 경우
                 * - 최대한 아래로 스크롤해서 TextField가 보이도록 함
                 */
                scrollRef.current?.scrollTo({
                  y: Number.MAX_SAFE_INTEGER, // 가능한 최대값으로 스크롤
                  animated: true,
                });
              }
            );
          }
        }, delay);
      });
    }

    // 🔗 외부에서 전달받은 onFocus 핸들러도 함께 실행
    inputProps?.onFocus?.(e);
  };

  /**
   * 멀티라인 TextField에서 텍스트 내용이 변경될 때의 스크롤 처리
   *
   * 🤔 언제 호출되는가?
   * - 사용자가 텍스트를 입력해서 TextInput의 크기가 변할 때
   * - 특히 줄바꿈이 일어나서 높이가 증가할 때
   * - Enter 키를 눌러서 새 줄이 추가될 때
   */
  const handleContentSizeChange = (e: any) => {
    /*
     * 🎯 멀티라인 + Android + 스크롤 컨테이너가 있을 때만 실행
     *
     * 왜 이 조건들이 필요한가?
     * - multiline: 싱글라인은 크기가 안 변하니까 불필요
     * - Android: iOS는 자동 처리되니까 불필요
     * - scrollRef & containerRef: 스크롤할 대상이 없으면 불필요
     */
    if (
      multiline && // 멀티라인일 때만
      Platform.OS === 'android' && // Android에서만
      scrollRef?.current && // 스크롤 컨테이너 존재
      containerRef.current // TextField 컨테이너 존재
    ) {
      /*
       * 🚀 실행 전략: 빠른 반응 vs 안정성
       * - requestAnimationFrame: 다음 화면 렌더링 때까지 대기
       * - 100ms timeout: TextInput 크기 변경이 완전히 반영될 때까지 대기
       * - focus보다 짧은 딜레이: 이미 키보드가 나와있는 상태라서
       */
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (scrollRef.current) {
            /*
             * 📐 다시 위치 측정 후 스크롤 조정
             * - 텍스트가 늘어났으니 TextField 위치/크기가 변했을 수 있음
             * - 새로운 크기를 기준으로 스크롤 위치 재계산
             */
            containerRef.current?.measureLayout(
              scrollRef.current as any,
              (_x, y, _width, height) => {
                /*
                 * 🧮 스크롤 위치 계산 (focus와 다른 방식)
                 * - y + height: TextField의 하단 위치
                 * - -100: 하단에서 100px 여유공간 확보
                 * - 결과: TextField 하단이 키보드 위쪽에 보이도록
                 */
                const scrollY = y + height - 100;

                scrollRef.current?.scrollTo({
                  y: Math.max(0, scrollY),
                  animated: true,
                });
              },
              () => {
                /*
                 * 🤷‍♂️ 실패 시에는 아무것도 안 함
                 * - focus와 달리 fallback 스크롤 안 함
                 * - 이유: 이미 어느 정도 적절한 위치에 있을 가능성이 높음
                 * - 갑작스러운 스크롤은 사용자 경험을 해칠 수 있음
                 */
              }
            );
          }
        }, 100); // focus의 300-400ms보다 짧은 딜레이
      });
    }

    // 🔗 외부에서 전달받은 onContentSizeChange 핸들러도 함께 실행
    inputProps?.onContentSizeChange?.(e);
  };

  return (
    <View ref={containerRef}>
      <Box direction="col" gap="md">
        <Box direction="row" gap="xs">
          <Typography variant="label" color="text-gray-700">
            {label}
          </Typography>
          {required && (
            <Typography variant="label" color="text-primary-400">
              *
            </Typography>
          )}
        </Box>

        <TextInput
          ref={handleInputRef}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.gray[150]}
          multiline={multiline}
          className={`border-b border-gray-150 pb-2 font-pretendard-400 text-body-1 ${
            inputClassName ?? ''
          }`}
          textAlignVertical={multiline ? 'top' : 'auto'}
          {...inputProps}
          onFocus={handleFocus}
          onContentSizeChange={handleContentSizeChange}
        />
      </Box>
    </View>
  );
}
