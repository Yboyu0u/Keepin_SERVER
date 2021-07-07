import { randomService } from "../services";
import returnCode from "../library/returnCode";


/**
 * @api {get} /random 랜덤키핀 조회 
 * 
 * @apiVersion 1.0.0
 * @apiName getRandom
 * @apiGroup Random 
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "랜덤 키핀 조회 성공",
 *   "data": {
 *       "taken": true,
 *       "category": [
 *           "칭찬",
 *           "깜짝"
 *       ],
 *       "friendIdx": [
 *           "60e34c82e2ada33a1e925704",
 *           "60e34c98e2ada33a1e925707"
 *       ],
 *       "_id": "60e46b35c167c37c296bbf4f",
 *       "title": "햄버거 고마워",
 *       "photo": "ㄹㅇ나룬어룬ㅇㄹㅇㄴ",
 *       "date": "20210704",
 *       "record": "투데이즈 해피데이~~",
 *       "userIdx": "60e349893460ec398ea1dc45",
 *       "__v": 0
 *   }
 * }
 *  
 * @apiErrorExample Error-Response:
 * -400 등록된 키핀 확인 
 * {
 *  "status": 400,
 *  "message": "등록된 키핀이 없습니다"
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */

const getRandom= async(req,res) => {
    const userIdx = req._id;
    try{
      
        // 친구들도 뽑아서 보여줘야 한다 ! 
        const randoms = await randomService.findRandoms({userIdx});

        if(randoms.length==0) {
            return res.status(returnCode.BAD_REQUEST).json({
                status: returnCode.BAD_REQUEST,
                message: "등록된 키핀이 없습니다" 
              });
        }

        const randomNumber = Math.floor(Math.random() * randoms.length+1);
        const randomId = randoms[randomNumber]._id;
        const data = await randomService.findRandom({randomId});

        return res.status(returnCode.OK).json({
            status:returnCode.OK,
            message:"랜덤 키핀 조회 성공",
            data
        })
    } catch (err) {
        console.error(err.message);
        res.status(returnCode.INTERNAL_SERVER_ERROR).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
}

export default {
   getRandom
}