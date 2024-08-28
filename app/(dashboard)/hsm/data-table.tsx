'use client';

import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

type Props = {};

const mockup = {
  actions: '/api/lunasa/actions',
  cluster: '/api/lunasa/cluster',
  config: '/api/lunasa/config',
  cpu: '/api/lunasa/cpu',
  disk: '/api/lunasa/disk',
  forceSoLogin: false,
  hsms: '/api/lunasa/hsms',
  memory: '/api/lunasa/memory',
  network: '/api/lunasa/network',
  ntls: '/api/lunasa/ntls',
  ntp: '/api/lunasa/ntp',
  packageFiles: '/api/lunasa/packageFiles',
  packages: '/api/lunasa/packages',
  sensors: '/api/lunasa/sensors',
  services: '/api/lunasa/services',
  snmp: '/api/lunasa/snmp',
  ssh: '/api/lunasa/ssh',
  syslog: '/api/lunasa/syslog',
  systemStatus: 'ISO (In Service Okay)',
  systemStatusCodes: '61,62,63',
  time: '/api/lunasa/time',
  upgrades: '/api/lunasa/upgrades',
  version: '7.8.4-254',
  webServer: '/api/lunasa/webServer',
};

const DataTable = (props: Props) => {
  // const [data, setData] = useState<any>(null);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/hsm');
  //       if (!response.ok) {
  //         const errorText = await response.text();
  //         throw new Error(errorText || 'API 요청 실패');
  //       }
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       setError('데이터를 가져오는 중 오류가 발생했습니다.');
  //       console.error('Fetch error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!data) {
  //   return <div>로딩 중...</div>;
  // }

  return (
    <div>
      <h1>API 데이터:</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      {/* <div>{mockup}</div> */}
      <p>{mockup.actions}</p>
      <Button onClick={() => {}}>API 호출</Button>
      <div>
        {Object.entries(mockup).map(([key, value]) => (
          <li key={key}>
            <strong>{key}</strong> <span>{value}</span>
          </li>
        ))}
      </div>
    </div>
  );
};

export default DataTable;
