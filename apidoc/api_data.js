define({ "api": [
  {
    "type": "post",
    "url": "/friend",
    "title": "친구 생성",
    "version": "1.0.0",
    "name": "createFriend",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"name\": \"보리\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 201,\n    \"message\": \"친구 등록 성공\",\n    \"name\": \"보리\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보(name))를 입력하세요.\"\n}\n\n- 400 중복된 값\n{\n    \"status\": 400,\n    \"message\": \"중복된 친구가 있습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "get",
    "url": "/friend/search?name=keyword",
    "title": "친구 검색 조회",
    "version": "1.0.0",
    "name": "searchFriends",
    "group": "Friend",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "\n- keyword에 검색할 단어를 넣음\n{\n    \"name\": \"보\" \n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"친구 검색 성공\",\n    \"data\": {\n        \"friends\": [\n            {\n                \"keepinIdx\": [],\n                \"_id\": \"60e416d15d759051988d18d0\",\n                \"name\": \"보리\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 등록된 친구가 없을 경우\n{\n    \"status\": 400,\n    \"message\": \"등록된 친구들이 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/friend.ts",
    "groupTitle": "Friend"
  },
  {
    "type": "post",
    "url": "/keepin",
    "title": "키핀하기 생성",
    "version": "1.0.0",
    "name": "createKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* taken: 준/받은 여부 -> taken: true이면 받은\n* friendIdx: friend name을 표시하기 위함\n\n{\n    \"title\": \"보리 생일\",\n    \"photo\": \"보리가 좋아하는 강아지 김밥\",\n    \"taken\": false,\n    \"date\": \"20211202\",\n    \"category\": [\"생일\", \"축하\"],\n    \"record\": \"우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.\",\n    \"friendIdx\":[\"60e416d15d759051988d18d0\", \"60e416d95d759051988d18d3\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀하기 생성 성공\",\n    \"keepin\": {\n        \"_id\": \"60e1d4070e50e39654b4bb5f\",\n        \"title\": \"보리 생일\",\n        \"photo\": \"보리가 좋아하는 강아지 김밥\",\n        \"taken\": false,\n        \"date\": \"2021.12.02\",\n        \"category\": [\n            \"생일\",\n            \"축하\"\n        ],\n        \"record\": \"우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.\",\n        \"friendIdx\": [\n            \"60e416d15d759051988d18d0\",\n            \"60e416d95d759051988d18d3\"\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보를 입력하세요.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "get",
    "url": "/keepin/detail/:keepinIdx",
    "title": "모아보기 상세페이지 조회",
    "version": "1.0.0",
    "name": "getDetailKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* [params] keepinIdx: 키핀 아이디에 해당하는 게시물",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀 상세페이지 조회 성공\",\n    \"keepin\": {\n        \"userIdx\": \"60e1d4070e50e39654b4bb5f\",\n        \"keepinIdx\": \"60e42158909d3063102be165\",\n        \"title\": \"보리 생일\",\n        \"photo\": \"보리가 좋아하는 강아지 김밥\",\n        \"friends\": [\n            \"보리\",\n            \"밀키\"\n        ],\n        \"record\": \"우리 보리의 첫돌. 이대로만 쑥쑥 커다오. 우리가족과 함께 해줘서 고마워.\",\n        \"cateogry\": [\n            \"생일\",\n            \"축하\"\n        ],\n        \"date\": \"2021.12.02\",\n        \"taken\": false\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 빈 경우\n{\n    \"status\": 400,\n    \"message\": \"요청바디가 없습니다\".\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "get",
    "url": "/keepin?taken=true",
    "title": "모아보기 준/받은 조회",
    "version": "1.0.0",
    "name": "getTakenKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* [Querystring] taken: 준/받은 여부 -> taken: true이면 받은",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"모아보기 준/받은 조회 성공\",\n    \"keepin\": [\n        {\n            \"taken\": true,\n            \"_id\": \"60e420f9909d3063102be161\",\n            \"title\": \"PM이 탕수육 사줬지롱\",\n            \"photo\": \"탕수육 사진\",\n            \"date\": \"2021.06.21\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 taken이 빈 값인 경우\n{\n    \"status\": 400,\n    \"message\": \"준/받은 여부를 선택하세요.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "get",
    "url": "/keepin/all?title=keyword",
    "title": "모아보기 검색어 조회",
    "version": "1.0.0",
    "name": "searchKeepin",
    "group": "Keepin",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* [Querystring] title: 제목으로 검색",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"키핀 검색어 조회 성공\",\n    \"data\": [\n        {\n            \"taken\": true,\n            \"_id\": \"60e420f9909d3063102be161\",\n            \"title\": \"PM이 탕수육 사줬지롱\",\n            \"photo\": \"탕수육 사진\",\n            \"date\": \"2021.06.21\"\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 빈 경우\n{\n    \"status\": 400,\n    \"message\": \"요청바디가 없습니다\".\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/keepin.ts",
    "groupTitle": "Keepin"
  },
  {
    "type": "post",
    "url": "/reminder",
    "title": "리마인더 생성",
    "version": "1.0.0",
    "name": "createReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* isAlarm : 푸쉬알람 여부(true/false) -> true일 경우, daysAgo 값 요청\n* isImportant : 중요 여부(true/false)\n* daysAgo: 0(당일),1(1일전),2(2일전),3(3일전),7(7일전)\n\n- 알람 받는 경우, daysAgo 값 요청\n{\n    \"title\": \"할아버지 생일\",\n    \"date\": \"20210705\",\n    \"isAlarm\": true,\n    \"daysAgo\": 2,\n    \"isImportant\": false\n}\n\n- 알람 받지 않는 경우\n{\n    \"title\": \"여자친구 생일\",\n    \"date\": \"20210802\",\n    \"isAlarm\": false,\n    \"isImportant\": false\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"리마인더 생성 성공\",\n    \"data\": {\n        \"_id\": \"60e1d4070e50e39654b4bb5f\",\n        \"title\": \"여자친구 생일\",\n        \"date\": \"20210802\",\n        \"isAlarm\": false,\n        \"isImportant\": true,\n        \"year\": \"2021\",\n        \"month\": \"08\"\n     }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"필수 정보(title, date, isAlarm, isImportant)를 입력하세요.\"\n}\n\n- 400 daysAgo이 없거나, 유효하지 않은 값 \n{\n    \"status\": 400,\n   \"message\": \"daysAgo 값(0,1,2,3,7)이 유효하지 않습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "delete",
    "url": "/reminder",
    "title": "리마인더 삭제",
    "version": "1.0.0",
    "name": "deleteReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n    \"reminderArray\": [\"60e322167887874ecccad066\",\"60e3221f7887874ecccad06a\"]\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n     \"status\": 200,\n     \"message\": \"리마인더 삭제 완료\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"reminderID Array 값이 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "get",
    "url": "/reminder/date/:year/:month",
    "title": "리마인더 월별 목록 조회",
    "version": "1.0.0",
    "name": "getMonthReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "* url: /reminder/date/2021/06\n* year : 조회 연도\n* month: 조회 달",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"월별 목록 조회 성공\",\n    \"data\": {\n        \"reminders\": [\n            {\n                \"isAlarm\": true,\n                \"isImportant\": true,\n                \"_id\": \"60e314a82175d36678ecb905\",\n                \"title\": \"남자친구 생일\",\n                \"date\": \"06.04\"\n            },\n            {\n                \"isAlarm\": false,\n                \"isImportant\": false,\n                \"_id\": \"60e1d4230e50e39654b4bb62\",\n                \"title\": \"할머니 생일\",\n                \"date\": \"06.15\"\n            },\n            {\n                \"isAlarm\": false,\n                \"isImportant\": false,\n                \"_id\": \"60e1d4310e50e39654b4bb64\",\n                \"title\": \"엄마 생일\",\n                \"date\": \"06.25\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 요청바디가 없음\n{\n    \"status\": 400,\n    \"message\": \"파라미터(year, month)를 입력하세요.\"\n}\n\n- 400 파라미터 형식이 맞지 않음\n{\n    \"status\": 400,\n    \"message\": \"파라미터(year, month) 형식을 맞춰주세요.\"\n}\n- 400 등록된 리마인더가 없음\n\n{\n    \"status\": 400,\n    \"message\": \"등록된 리마인더가 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "get",
    "url": "/reminder/oncoming",
    "title": "[홈화면] 다가오는 리마인더 2개 조회",
    "version": "1.0.0",
    "name": "getOncommingReminder",
    "group": "Reminder",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n    \"Content-Type\": \"application/json\"\n    \"jwt\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZ~~\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "- 200 OK\n{\n    \"status\": 200,\n    \"message\": \"다가오는 리마인더(2개) 목록 조회 성공\",\n    \"data\": {\n        \"reminders\": [\n            {\n                \"isImportant\": true,\n                \"_id\": \"60e31f4c8f432a4ec071fce3\",\n                \"title\": \"남자친구 생일\",\n                \"date\": \"07.06\"\n            },\n            {\n                \"isImportant\": true,\n                \"_id\": \"60e30b950fea5314141f0608\",\n                \"title\": \"여자친구 생일\",\n                \"date\": \"08.02\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "- 400 다가오는 리마인더가 없음\n\n{\n    \"status\": 400,\n    \"message\": \"다가오는 리마인더가 없습니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/reminder.ts",
    "groupTitle": "Reminder"
  },
  {
    "type": "post",
    "url": "/user/signup",
    "title": "회원가입",
    "version": "1.0.0",
    "name": "SignUp",
    "group": "User",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n \"email\": \"keepin@gmail.com\",\n \"password\": \"1234abcd\",\n // ...\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "jwt",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "200 OK\n{\n \"status\": 200,\n \"message\":    ,\n \"data\": {\n   \"jwt\":\"\"\n }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "400 아이디 중복\n{\n \"status\": 400,\n \"message\": \"이미 사용 중인 아이디입니다.\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/user.ts",
    "groupTitle": "User"
  }
] });
