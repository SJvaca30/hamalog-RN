const BASE_URL = 'http://49.142.154.182:8080';

async function testAPI() {
  console.log('🚀 백엔드 API 테스트 시작\n');

  try {
    // 1. 서버 상태 확인
    console.log('1️⃣ 서버 상태 확인...');
    const healthResponse = await fetch(BASE_URL, {
      method: 'HEAD',
      redirect: 'manual', // 리다이렉트 자동 처리 방지
    });

    if (healthResponse.status >= 200 && healthResponse.status < 400) {
      console.log('✅ 서버 응답:', healthResponse.status);
    } else {
      console.log('❌ 서버 응답 오류:', healthResponse.status);
    }

    // 2. 회원가입 테스트 (새로운 이메일로)
    console.log('\n2️⃣ 회원가입 테스트...');
    const randomEmail = `test${Date.now()}@example.com`;
    const signupData = {
      loginId: randomEmail,
      password: 'test1234',
      name: '테스트유저',
      nickName: '테스트',
      phoneNumber: '01012345678',
      birth: '1990-01-01',
    };

    try {
      const signupResponse = await fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const signupResult = await signupResponse.json();
      if (signupResponse.ok) {
        console.log('✅ 회원가입 성공:', signupResult);
      } else {
        console.log('❌ 회원가입 실패:', signupResult);
      }
    } catch (error) {
      console.log('❌ 회원가입 요청 실패:', error.message);
    }

    // 3. 로그인 테스트
    console.log('\n3️⃣ 로그인 테스트...');
    const loginData = {
      loginId: randomEmail,
      password: 'test1234',
    };

    try {
      const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const loginResult = await loginResponse.json();
      if (loginResponse.ok) {
        console.log('✅ 로그인 성공:', loginResult);

        const token = loginResult.token;
        console.log('🔑 JWT 토큰 획득:', token.substring(0, 50) + '...');

        // 4. 인증된 API 테스트
        console.log('\n4️⃣ 인증된 API 테스트...');

        // 최근 부작용 목록 조회 (userId=1로 테스트)
        try {
          const sideEffectResponse = await fetch(
            `${BASE_URL}/side-effect/recent?userId=1`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const sideEffectResult = await sideEffectResponse.json();
          if (sideEffectResponse.ok) {
            console.log('✅ 부작용 목록 조회 성공:', sideEffectResult);
          } else {
            console.log('❌ 부작용 목록 조회 실패:', sideEffectResult);
          }
        } catch (error) {
          console.log('❌ 부작용 목록 요청 실패:', error.message);
        }
      } else {
        console.log('❌ 로그인 실패:', loginResult);
      }
    } catch (error) {
      console.log('❌ 로그인 요청 실패:', error.message);
    }
  } catch (error) {
    console.log('❌ 서버 연결 실패:', error.message);
  }

  console.log('\n🏁 API 테스트 완료');
}

// 테스트 실행
testAPI();
