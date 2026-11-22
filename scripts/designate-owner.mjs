import {authStore} from '../lib/auth/store.mjs';
import {bootstrapOwner} from '../lib/auth/core.mjs';
const id=process.argv[2];if(!/^[a-f0-9-]{36}$/.test(id||'')){console.error('사용법: node scripts/designate-owner.mjs <SNS 가입 후 확인한 회원 UUID>');process.exit(1)}
const user=await bootstrapOwner(authStore,id);console.log('최초 관리자 지정 완료: '+user.id+'. 해당 회원은 다시 로그인해야 합니다.');
