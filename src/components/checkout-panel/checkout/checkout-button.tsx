import React from 'react';
import { Button } from '../../common';

const CheckoutButton: React.FC = (): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';

    // const checkoutCard = {
    //     checkout_value_id: '',
    //     cost_in_cents: '',
    //     value_in_cents: '',
    //     name: 'string',
    // };

    const buttonHandler = async () => {

        console.log('Not sure where is there is a specific endpoint that I should hit or if I should be creating the server and endpoint.')


        // try {
        //     const response = await fetch('http://0.0.0.0:8069/',{
        //         method: 'POST',
        //         headers: { 'content-type': 'application/json' },
        //     })
        // } catch(err){
        //     throw new Error(`Error! status: ${response.status}`);
        // }
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
