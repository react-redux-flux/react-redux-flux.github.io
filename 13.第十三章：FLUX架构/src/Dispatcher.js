/**
 * Created by Acer on 2017/1/28.
 */
const storeCallbackList = [];
const middlewareList = [];

module.exports = {
    use(middleware){
        middlewareList.push(middleware);
        return this;
    },
    register(storeCallback){
        storeCallbackList.push(storeCallback)
    },
    dispatch(action){
        let index = -1;
        let that = this;
        function next(){
            const middle = middlewareList[++index]
            if(middle){
                middle(action,next);
            }else{
                that._dispatch(action);
            }
        }
        next()
    },
    _dispatch(action){
        for(let callback of storeCallbackList){
            callback(action)
        }
    }
}