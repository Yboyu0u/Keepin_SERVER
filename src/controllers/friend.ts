import { friendService, keepinService } from "../services";
import { validationResult } from "express-validator"
const returnCode = require('../library/returnCode');

/**
 * @api {post} /friend 친구 생성
 * 
 * @apiVersion 1.0.0
 * @apiName createFriend
 * @apiGroup Friend
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * {
    "name": "보리"
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 201,
    "message": "친구 등록 성공",
    "name": "보리"
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 요청바디가 없음
 * {
    "status": 400,
    "message": "필수 정보(name))를 입력하세요."
 * }
 * 
 * - 400 중복된 값
 * {
    "status": 400,
    "message": "중복된 친구가 있습니다."
 * }
 */
const createFriend= async(req,res) => {
    const userIdx = req._id;  
    const {name} = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400).json({
        status: returnCode.BAD_REQUEST,
        message: "필수 정보(name))를 입력하세요."
        });
    }
    try{
        //중복 check   //이거 name 하고 userIdx로 해야 함 !
        const alFriend = await friendService.findFriendByNameAnduserIdx({name,userIdx});
        if(alFriend.length>0){
            return res.status(400).json({
                status:400,
                message:"중복된 친구가 있습니다."
            });
        }

        await friendService.saveFriend({name, userIdx});
        return res.status(201).json({
            status:201,
            message:"친구 등록 성공",
            name: name
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

/**
 * @api {get} /friend 친구 목록 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getFriends
 * @apiGroup Friend
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 *  
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "친구 조회 성공",
 *  "data": {
 *            "friends": [
 *             { 
 *               "_id": "60e46c82c167c37c296bbf58",
 *               "name": "코코"
 *             },
 *             { 
 *               "_id": "60e46d82c167c37c26bbf23",
 *               "name": "밀키"
 *             },
 *             ...
 *           ]
 * }
 *  
 * @apiErrorExample Error-Response:
 * -400 친구 목록 확인
 * {
 *  "status": 400,
 *  "message": "등록된 친구들이 없습니다."
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getFriends= async(req,res) => {
    const userIdx = req._id;
    try{
        const friends = await friendService.findFriendsByUserIdx({userIdx});
        console.log(friends);
        if(friends.length==0){
            return res.status(400).json({
                status:400,
                message:"등록된 친구들이 없습니다."
            });
        }

        const data = {friends};

        return res.status(returnCode.OK).json({
            status:returnCode.OK,
            message:"친구 조회 성공",
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

/**
 * @api {get} /friend/:friendId 친구 상세 조회
 * 
 * @apiVersion 1.0.0
 * @apiName getFriends
 * @apiGroup Friend
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
 *  "Content-Type": "application/json",
 *  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 *  
 * @apiSuccessExample {json} Success-Response:
 * -200 OK
 *{
 *  "status": 200,
 *  "message": "친구 상세 조회 성공",
 *  "data": {
 *      "name": "코코",
 *      "total": 3,
 *      "taken": 2,
 *      "given": 1,
 *      "memo": "코코는 초콜릿을 너무 좋아한당"
 *   }  
 * }
 *  
 * @apiErrorExample Error-Response:
 * -400 친구 유무 확인
 * {
 *  "status": 400,
 *  "message": "등록된 친구가 없습니다."
 * }
 * -500 서버error
 * {
 *  "status": 500,
 *  "message": "INTERNAL_SERVER_ERROR"
 * }
 */
const getFriendDetail= async(req,res) => {
    const userIdx = req._id;
    const friendIdx = req.params.friendId;
    try{
        const friend = await friendService.findFriendByFriendIdx({friendIdx});
        if(!friend){
            return res.status(400).json({
                status:400,
                message:"등록된 친구가 없습니다"
            });
        }
        const name = friend.name;
        const memo = friend.memo;
        const keepins = friend.keepinIdx; 
        const total = keepins.length;
        let taken = 0;
        let given = 0;
        for(const keepinId of keepins){
            const keepinIdx = keepinId.toString();
            const keepin = await keepinService.findKeepinByKeepinIdx({keepinIdx});
            if(keepin.taken==false){
                given++;
            }else{
                taken++;
            }
        }
        const data = {name, total, taken, given, memo};

        return res.status(returnCode.OK).json({
            status:returnCode.OK,
            message:"친구 상세 조회 성공",
            data
        })
    }catch(err){
        res.status(returnCode.INTERNAL_SERVER_ERROR).json({
            status: returnCode.INTERNAL_SERVER_ERROR,
            message: err.message,
        });
        return;
    }
}

//친구에게 받은 keepin 목록 조회

//친구에게 준 keepin 목록 조회

//친구 메모 수정 

/**
 * @api {get} /friend/search?name=keyword 친구 검색 조회
 * 
 * @apiVersion 1.0.0
 * @apiName searchFriends
 * @apiGroup Friend
 * 
 * @apiHeaderExample {json} Header-Example:
 * {
    "Content-Type": "application/json"
    "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~"
 * }
 * 
 * @apiParamExample {json} Request-Example:
 * 
 * - [QueryString]: keyword에 검색할 단어를 넣음
 * {
    "name": "보" 
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * - 200 OK
 * {
    "status": 200,
    "message": "친구 검색 성공",
    "data": {
        "friends": [
            {
                "keepinIdx": [],
                "_id": "60e416d15d759051988d18d0",
                "name": "보리"
            }
        ]
    }
 * }
 * 
 * @apiErrorExample Error-Response:
 * - 400 등록된 친구가 없을 경우
 * {
    "status": 400,
    "message": "등록된 친구들이 없습니다."
 * }
 * 
 */
const searchFriends= async(req,res) => {
    const userIdx = req._id;
    const name = req.query.name;
    try{
        const friends = await friendService.searchFriendByKeyword({name: name, userIdx: userIdx});
        console.log(friends);
        if(friends.length==0){
            return res.status(400).json({
                status:400,
                message:"등록된 친구들이 없습니다."
            });
        }
        // if(!name){
        //     return res.status(400).json({
        //         status:400,
        //         message:"검색어를 입력해주세요."
        //     });
        // }

        const data = {friends};
        
        return res.status(returnCode.OK).json({
            status:returnCode.OK,
            message:"친구 검색 성공",
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
   createFriend,
   getFriends,
   getFriendDetail,
   searchFriends
}
