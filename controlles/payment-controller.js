const {variablesConfig: {SECRET_KEY_STRIPE, SUCCESS_URL, CANCEL_URL}, constantsConfig} = require('../config');

const stripe = require(constantsConfig.STRIPE)(SECRET_KEY_STRIPE);

module.exports = {

    payment: async (req, res, next) => {
        try {
//console.log(req.body);
            const line_items = req.body.cart.map(item => {
                return {
                    price_data: {
                        currency: constantsConfig.UAH,
                        product_data: {
                            name: item.product_name,
                            //Images: [item.image]
                            description: item.title,
                            metadata: {
                                id: item.id
                            }
                        },
                        unit_amount: item.price * 100,
                    },
                    quantity: item.count,
                }
            })

            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: constantsConfig.PAYMENT,
                success_url: SUCCESS_URL,
                cancel_url: CANCEL_URL,
            });

            // res.redirect(303, session.url);
            res.json(session);

        } catch (e) {
            next(e);
        }
    }
};
