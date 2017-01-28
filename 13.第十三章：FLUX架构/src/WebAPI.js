/**
 * Created by Acer on 2017/1/28.
 */
module.exports = {
    getAll(callback){
        setTimeout(function(){
            callback(['aaa','bbb','ccc']);
        },301)
    }
}