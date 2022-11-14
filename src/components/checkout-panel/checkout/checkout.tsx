import React, { useEffect } from 'react';
import { GiftCard } from '../../common/ui-widgets/gift-card';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { useAppSelector } from '../../../hooks';
import RedemptionAmounts from './RedemptionAmounts';
import './checkout.less';
import { PrizeoutOfferValueOptions, selectOfferCard } from '../../../slices/offers-slice';
import { setSelectedOfferPrice, selectOfferPrice } from '../../../slices/checkout-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const dispatch = useDispatch<AppDispatch>();
    const offerCard = useAppSelector(selectOfferCard);
    const giftCardValue = useAppSelector(selectOfferPrice);

    const onClickHandler = (price: PrizeoutOfferValueOptions) => {
        dispatch(setSelectedOfferPrice(price));
    };

    const valuesFormatted = (i: number) =>
        i.toLocaleString('en-US', {
            currency: 'USD',
            style: 'currency',
        });

    // console.log(giftCardValue);

    const price = valuesFormatted(giftCardValue?.cost_in_cents / 100);
    const bonusFormatted = valuesFormatted((giftCardValue?.value_in_cents - giftCardValue?.cost_in_cents) / 100);
    const valueFormatted = valuesFormatted(giftCardValue?.value_in_cents / 100);

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    {offerCard && (
                        <>
                            <section className="checkout__brand">
                                <GiftCard
                                    name={offerCard.name}
                                    imgUrl={offerCard.image_url}
                                    altText={offerCard.name}
                                    className="offerCard"
                                />
                            </section>
                            <h3>Select Redemption Amount</h3>
                            <section className="checkout_amounts">
                                {offerCard.giftcard_list.map((i) => (
                                    <RedemptionAmounts
                                        key={i.checkout_value_id}
                                        id={i.checkout_value_id}
                                        cardBalance={i.cost_in_cents}
                                        clickHandler={() => onClickHandler(i)}
                                    />
                                ))}
                            </section>
                        </>
                    )}
                    {giftCardValue && (
                        <section className="checkout_details">
                            <div className='detail'>
                                <span>Redemption Amount:</span> <span>{price}</span>
                            </div>
                            <div className=" detail bonus-detail">
                                <span>Prizeout Bonus (+{giftCardValue.display_bonus}%):</span> <span>{bonusFormatted}</span>
                            </div>
                            <div className='detail'>
                                <span>You Get:</span> <span>{valueFormatted}</span>
                            </div>
                        </section>
                    )}
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
