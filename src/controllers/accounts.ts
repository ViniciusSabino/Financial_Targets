import { Context } from 'koa';

import AccountModel from '../database/models/Account';
import UserModel from '../database/models/User';
import { AccountType } from '../utils/enums/accounts';

const createCheckingAccount = async (ctx: Context): Promise<void> => {
    const userId = ctx.request.headers.userid;

    const user = await UserModel.findById(userId).lean();

    const account = {
        name: ctx.request.body.name,
        type: AccountType.CHECKING_ACCOUNT,
        isMain: ctx.request.body.isMain,
        user,
    };

    const model = new AccountModel(account);

    const createdAccount = await model.save();

    ctx.status = 200;
    ctx.body = createdAccount;
};

export default { createCheckingAccount };
