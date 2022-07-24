const emailActionsEnum = require('../configs/email-action.enum');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!!'
    },

    [emailActionsEnum.ORDER_READY]: {
        templateName: 'ready',
        subject: 'Your order is ready'
    },

    [emailActionsEnum.UPDATE]: {
        templateName: 'update',
        subject: 'You were update your deviceInfo.'
    },

    [emailActionsEnum.FORGOT_PASSWORD]: {
        templateName: 'forgot-password',
        subject: 'Everybody forgot something'
    },

    [emailActionsEnum.POST_DEVICE]: {
        templateName: 'post_device',
        subject: 'You are posted device'
    }

};
