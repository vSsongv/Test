const mentoService = require('./mentoService');
const userService = require('../User/userService');
const {basicResponse, resultResponse}  = require('../config/response');
const detailResponse = require('../config/responseDetail');
const asyncHandler = require('../config/asyncHandler');
const errorResponse = require('../config/errorResponse');
const regNumber = /^[0-9]/;
const mento = {
    connectMentoring : asyncHandler(async function(req, res, next){
        const userIdx = req.user.userid;
        const mentoringid = req.body.mentoringid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));
        const status = await mentoService.checkMentoring(mentoringid);
        if(status.status === 'I' || status.status === 'F') return next(new errorResponse(basicResponse(detailResponse.ALREADY_MENTROING_QUESTION), 400));
        
        await mentoService.connectMentoring(userIdx, mentoringid);

        return res.send(basicResponse(detailResponse.CONNECT_MENTORING))
    }),
    getQuestionList : asyncHandler(async function(req, res, next){
        const type = req.query.type;
        const language = req.query.language;
        if(!type || !language || language<=0) return next(new errorResponse(basicResponse(detailResponse.BAD_STATUS_URI)));
        if(type != 0 && type != 1 && type!= 2) return next(new errorResponse(basicResponse(detailResponse.BAD_STATUS_URI)));

        const userIdx = req.user.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));
        
        let status;
        (type == 1) ? status='I' : status='F';
        if(type == 0) list = await mentoService.getSpecificQuestion(language);
        else list = await mentoService.getQuestionList(language, status, userIdx); 
        if(list.length === 0) return next(new errorResponse(basicResponse(detailResponse.NO_QUESTION)));

        return res.send(resultResponse(detailResponse.GET_QUESTION, list));
    }),
    getQuestion : asyncHandler(async function(req, res, next){
        const mentoringid = req.params.mentoringid;
        if(!mentoringid) return next(new errorResponse(basicResponse(detailResponse.BAD_STATUS_URI)));

        const userIdx = req.user.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));

        const question = await mentoService.getQuestion(mentoringid);
        if(!question) return next(new errorResponse(basicResponse(detailResponse.NO_QUESTION)));

        return res.send(resultResponse(detailResponse.GET_QUESTION, question));
    }),
    CountQuestionNum : asyncHandler(async function(req, res, next){
        const userIdx = req.user.userid;
        if(!userIdx) return next(new errorResponse(basicResponse(detailResponse.EMPTY_TOKEN), 400));
        if(!regNumber.test(userIdx)) return next(new errorResponse(basicResponse(detailResponse.TOKEN_VERFICATION_FAIL), 400));

        const count = await mentoService.CountQuestionNum(userIdx);
        if(!count) return next(new errorResponse(basicResponse(detailResponse.FAIL_QUESTION_COUNT)));

        return res.send(resultResponse(detailResponse.GET_QUESTION_COUNT, count));
    }),
};

module.exports = mento;