const { validateToken } = require("../services/auth");

function checkForAuthentication(cookieName) {
    return (req, res, next) => {
        const tookenCookieValue = req.cookies[cookieName]
        if(!tookenCookieValue){
            return next();
        }

        try {
            const userPayLoad = validateToken(tookenCookieValue);
            req.user = userPayLoad;

        } catch (error) {}
        return next();
    }
}

module.exports = {
    checkForAuthentication
}