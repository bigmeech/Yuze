var express = require('express');
var router =  express.Router();
var sentiment = require('sentiment');


/*
 *
 *  Route Definitions
 *
 * */

router.get('/score', getScore);
router.get('/analyseScore', analyseScore);




/*
 *  Route functions
 *
 * @getScore
 * GET - /score
 * Return the score for a sentence based on  AFINN-111 wordlist
 *
 * */
function getScore(req,res){
    var input = req.params;

    return res.send(sentiment(input.sentence));
}

/*
*
*  @get
*  GET - /analyseScore
*  Return score for each keyword in a sentence based on  AFINN-111 wordlist
*
*
 */
function analyseScore(req,res){
    var input = req.params;
     return res.send('Return Score for each keyword');
}


module.exports = router;