import express from 'express';
import { keepinController } from '../controllers';
import auth from '../middlewares/auth';
import upload from '../middlewares/multer';
const router = express();
// upload.array('image', 3)
/* KEEPIN */
// 키핀하기 생성
// router.post('/', auth.checkToken, upload.array('photo', 3), keepinController.createKeepin;
// router.post('/', auth.checkToken, keepinController.createKeepin);

//키핀하기 생성
router.post('/all', auth.checkToken, upload.array('photo', 3), keepinController.createKeepin);
//키핀하기 생성 1
router.post('/', auth.checkToken, keepinController.createKeepinText);
//키핀하기 이미지생성 2
router.post('/photo/:keepinIdx', auth.checkToken, upload.array('photo', 3), keepinController.createKeepinPhoto);
// 모아보기 받은/준 필터링
router.get('/', auth.checkToken, keepinController.getTakenKeepin);
// 모아보기 전체 검색
router.get('/all', auth.checkToken, keepinController.searchKeepin);
// 모아보기 게시글 상세보기
router.get('/detail/:keepinIdx', auth.checkToken, keepinController.getDetailKeepin);
// 모아보기 카테고리 조회
router.get('/category', auth.checkToken, keepinController.getKeepinByCategory);
// 키핀 수정
router.put('/modify/:keepinIdx', auth.checkToken, upload.array('photo', 3), keepinController.modifyKeepin);
// router.put('/:keepinIdx', auth.checkToken, keepinController.modifyKeepin);
// 키핀 삭제
router.post('/delete', auth.checkToken, keepinController.deleteKeepin);

export default router;
