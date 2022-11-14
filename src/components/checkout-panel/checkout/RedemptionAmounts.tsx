import React from 'react';
import { Button } from '../../common';
import { useAppSelector } from '../../../hooks';
import { selectOfferPrice } from '../../../slices/checkout-slice';

interface RedemptionAmountsProps {
    id: string;
    cardBalance: number;
    clickHandler: () => void;
}

const RedemptionAmounts: React.FC<RedemptionAmountsProps> = ({ id, cardBalance, clickHandler }): React.ReactElement => {
    const selectedOfferPrice = useAppSelector(selectOfferPrice);
    const btnColor = selectedOfferPrice?.checkout_value_id === id ? 'primary' : '';

    const priceFormatted = cardBalance / 100;
    const price = priceFormatted.toLocaleString('en-US', {
        currency: 'USD',
        style: 'currency',
    });

    // console.log(id);

    return (
        <Button
            ariaLabel={price}
            id={id}
            text={price}
            size="small"
            type="button"
            color={btnColor}
            onClick={clickHandler}
        />
    );
};

export default RedemptionAmounts;
