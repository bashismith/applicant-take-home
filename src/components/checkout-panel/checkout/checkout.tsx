import React from 'react';
import { GiftCard } from '../../common/ui-widgets/gift-card';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { useAppSelector } from '../../../hooks';
import RedemptionAmounts from './RedemptionAmounts';
import './checkout.less';
import { PrizeoutOfferValueOptions, selectOfferCard } from '../../../slices/offers-slice';
import { setSelectedOfferPrice } from '../../../slices/checkout-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const offerCard = useAppSelector(selectOfferCard);
    const dispatch = useDispatch<AppDispatch>();

    console.log(offerCard);

    const onClickHandler = (option: PrizeoutOfferValueOptions) => {
        dispatch(setSelectedOfferPrice(option));
    };

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
