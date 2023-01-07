import Model, { Balance } from '../../../database/models/Balance';
import { DateInfo } from '../../../utils/helpers/date';

const findCurrentBalancesByUser = async (userId: string, dateInfo: DateInfo): Promise<Array<Balance>> => {
    const { month, year } = dateInfo;

    const currentBalances = await Model.find({ month, year })
        .populate({ path: 'account', match: { user: userId } })
        .lean();

    return currentBalances as Array<Balance>;
};

export default findCurrentBalancesByUser;
