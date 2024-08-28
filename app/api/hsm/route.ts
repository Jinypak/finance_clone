import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`https://192.168.0.107:8443/api/lunasa`, {
      headers: {
        'Content-Type': 'application/vnd.safenetinc.lunasa+hsm;version=14',
        Authorization: 'Basic YWRtaW46QXBrbzgwODUh',
      },
    });

    if (!res.ok) {
      // 서버 응답이 성공적이지 않은 경우
      const errorText = await res.text();
      console.error('Error response:', errorText);
      return NextResponse.json(
        { error: 'API 요청 실패', details: errorText },
        { status: res.status }
      );
    }

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const result = await res.json();
      return NextResponse.json(result);
    } else {
      // JSON 형식이 아닌 응답 처리
      const errorText = await res.text();
      console.error('Unexpected content type:', contentType);
      return NextResponse.json(
        { error: 'Unexpected content type', details: errorText },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return NextResponse.json(
      { error: '데이터를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
