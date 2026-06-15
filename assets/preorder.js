// @ts-nocheck
(function () {
    let jQueryPreOrder, addToCartLabel, currentProduct;

    let preOrderCustomConfig = {
        'enableCartRedirection': true,
        ...this.hcPreOrderCustomConfig
    };

    function getAddToCartLabel () {
        if (location.pathname.includes('/products/')) {
            const addToCartButton = jQueryPreOrder(".hc_preorderButton")
            addToCartLabel = addToCartButton.find('.add-to-cart-text__content > span > span').text();
        }
    }

    let loadScript = function(url, callback){

        let script = document.createElement("script");
        script.type = "text/javascript";

        if (script.readyState){ 
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" || script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function(){
                callback();
            };
        }
    
        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
        
    };

    if ((typeof jQuery === 'undefined') || (parseFloat(jQuery.fn['jquery']) < 1.7)) {
        loadScript('//ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js', function(){
            jQueryPreOrder = jQuery.noConflict(true);
            jQueryPreOrder(document).ready(function() {
                getAddToCartLabel();
                initialisePreOrder();
            });
        });
    } else {
        jQueryPreOrder = jQuery;
        jQueryPreOrder(document).ready(function() {
            getAddToCartLabel();
            initialisePreOrder();
        });
    }

    function getProductTypeAndEstimatedDate() {
        let productType, estimatedDeliveryDate;

        let info = jQueryPreOrder(".hc_preorder_metafield").val()
        let metafieldInformation = {}
        try {
            metafieldInformation = JSON.parse(info)
        } catch(err) {
            console.error(err)
        }

        if(metafieldInformation["PROMISE_DATE"] && metafieldInformation["PROMISE_DATE"].status) {
            productType = metafieldInformation["PROMISE_DATE"].status == 'active' ? metafieldInformation["PROMISE_DATE"].preorderType === 'PRE_ORDER' ? 'Pre-Order' : metafieldInformation["PROMISE_DATE"].preorderType === 'BACKORDER' ? 'Back-Order' : '' : ''
            estimatedDeliveryDate = metafieldInformation["PROMISE_DATE"].promise_date
        }
        return { productType, estimatedDeliveryDate }
    }

    async function initialisePreOrder () {
        if (location.pathname.includes('/products/')) {

            let hcpreorderShipsFrom = jQueryPreOrder("#hc_preordershipsfrom");
            let span = jQueryPreOrder("#hc_preordershipsfrom span");

            jQueryPreOrder(".hc-product-form").each(async function (i, form) {
            const cartForm = jQueryPreOrder(form)
            const currentVariantId = cartForm.serializeArray().find(ele => ele.name === "id").value;

            const preorderButton = jQueryPreOrder(".hc_preorderButton");

            hcpreorderShipsFrom.css('visibility', 'hidden');
            preorderButton.find('.add-to-cart-text__content > span > span').text(addToCartLabel)

            // removing the click event with handler addToCart
            preorderButton.off('click', addToCart);
            jQueryPreOrder(".hc-bopis-button").show();
            jQueryPreOrder("#hc-edd").show();
            jQueryPreOrder("#hc-edd-sample-codes").show();
            // preorderButton.siblings().css('display', 'block');

            let { productType, estimatedDeliveryDate } = getProductTypeAndEstimatedDate();

            if (!productType) {
                hcpreorderShipsFrom.hide();
                return;
            }

            // if the date is of past then making it empty
            let now = new Date();
            now.setHours(0, 0, 0, 0)
            if (new Date(estimatedDeliveryDate) < now) {
                estimatedDeliveryDate = '';
            }

            jQueryPreOrder(".hc-bopis-button").hide();
            jQueryPreOrder("#hc-edd").hide();
            jQueryPreOrder("#hc-edd-sample-codes").hide();

            // preorderButton.siblings().css('display', 'none');

            // Using different namespace for preorder and backorder but will update it to use single
            // namespace for the both the things
            const label = productType === 'Pre-Order' ? 'Pre-Order' : productType === 'Back-Order' ? 'Backorder' : ''

            preorderButton.find('.add-to-cart-text__content > span > span').text(label)

            // will find for a tag with id hc_preordershipsfrom and if found then add the date to the tag
            if(hcpreorderShipsFrom.length > 0) {
                // if the value of the metafield is not _NA_ and NULL then only making the date field visible
                if (estimatedDeliveryDate && estimatedDeliveryDate !== 'NULL' && estimatedDeliveryDate !== '_NA_') {
                    span.html(`${estimatedDeliveryDate}`)
                    hcpreorderShipsFrom.css('visibility', 'visible');
                } else if (productType === 'Back-Order' && jQueryPreOrder(".hc_backorderString").length){
                    hcpreorderShipsFrom.css('visibility', 'visible');
                    estimatedDeliveryDate = jQueryPreOrder(".hc_backorderString").text();
                    span.html(`${estimatedDeliveryDate}`)
                }
            }
            preorderButton.off('click')
            // will handle the click event on the pre order button
            preorderButton.on("click", { cartForm, label, estimatedDeliveryDate },  addToCart);
            })
        } else {
            // this part executes on all the page other than product page
            // finding an input field with name tags and then iterating over the same
            jQueryPreOrder("input[id='hc_tags']").map(async function (index, element) {

                const variantTagInput = jQueryPreOrder(element);
                const tags = variantTagInput.val()

                // checking for Pre-Order or Back-Order tag
                if (tags.includes('HC:Pre-Order') || tags.includes('HC:Backorder')) {

                    const backOrderDate = variantTagInput.siblings("input[id=hc_backOrderDate]").val() // TODO: remove this as kept for backward compatibility
                    const preOrderDate = variantTagInput.siblings("input[id=hc_preOrderDate]").val() // TODO: remove this as kept for backward compatibility
                    const isAvailable = variantTagInput.siblings("input[id=hc_product_available]").val()
                    const continueSelling = variantTagInput.siblings("input[id=hc_continueSelling]").val()
                    const variantInventory = variantTagInput.siblings("input[id=hc_inventory]").val()
                    const metaData = variantTagInput.siblings("input[id=hc_metaFieldData]").val() ? JSON.parse(variantTagInput.siblings("input[id=hc_metaFieldData]").val()) : ''

                    if (isAvailable && isAvailable == 'true' && continueSelling && continueSelling == 'continue' && variantInventory <= 0) {

                        let { productType, estimatedDeliveryDate } = getProductTypeAndEstimatedDate({ metaData, backOrderDate, preOrderDate, tags })
                        
                        if(!productType) return;

                        // finding a button with type submit as the button will be on the same level as the input field so using siblings
                        const preorderButton = variantTagInput.siblings("#hc_preorderButton, .hc_preorderButton");
                        const cartForm = variantTagInput.parent();

                        // if the date is of past then making it empty
                        let now = new Date();
                        now.setHours(0, 0, 0, 0)
                        if (new Date(estimatedDeliveryDate) < now) {
                            estimatedDeliveryDate = '';
                        }

                        // Using different namespace for preorder and backorder but will update it to use single
                        // namespace for the both the things
                        const label = productType === 'Pre-Order' ? 'Pre-Order' : productType === 'Back-Order' ? 'Backorder' : ''

                        // will add Pre Order / Back Order label to the button
                        preorderButton.val(label);

                        if ((!estimatedDeliveryDate || estimatedDeliveryDate == '_NA_' || estimatedDeliveryDate == 'NULL') && productType === 'Back-Order' && jQueryPreOrder(".hc_backorderString").length) {
                            estimatedDeliveryDate = jQueryPreOrder(".hc_backorderString").text();
                        }

                        // will handle the click event on the pre order button
                        preorderButton.on("click", {cartForm, label, estimatedDeliveryDate}, addToCart);
                    }
                }
            })
        }
    }

    // defined this method to handle add to cart from the product detail page
    function addToCart(event) {
        let addToCartForm = event.data.cartForm;
        let estimatedDeliveryDate = event.data.estimatedDeliveryDate;

        event.preventDefault();
        event.stopImmediatePropagation();

        let orderProperty = jQueryPreOrder(`<input id="pre-order-item" name="properties[Note]" value="${event.data.label}" type="hidden"/>`)
        let estimatedDeliveryDateProperty = jQueryPreOrder(`<input id="pre-order-item" name="properties[PROMISE_DATE]" value="${estimatedDeliveryDate}" type="hidden"/>`)

        addToCartForm.append(orderProperty)
        // adding promise date to cart only if it's present
        if (estimatedDeliveryDate && estimatedDeliveryDate !== 'NULL' && estimatedDeliveryDate !== '_NA_') addToCartForm.append(estimatedDeliveryDateProperty)

        const quantityField = addToCartForm.find('[name="quantity"]');
        if (quantityField.length) {
            quantityField.val(1);
        }

        addToCartForm.append(canUpdateQuantityProperty);

        // using the cart add endpoint to add the product to cart, as using the theme specific methods is not recommended.
        jQueryPreOrder.ajax({
            type: "POST",
            url: '/cart/add.js',
            data: addToCartForm.serialize(),
            dataType: 'JSON',
            success: function () {
                // redirecting the user to the cart page after the product gets added to the cart
                if (preOrderCustomConfig.enableCartRedirection) {
                    location.replace('/cart');
                }
            }
        })

        orderProperty.remove();
        if (estimatedDeliveryDate && estimatedDeliveryDate !== 'NULL' && estimatedDeliveryDate !== '_NA_') estimatedDeliveryDateProperty.remove();
    }

    // TODO move it to intialise block
    // To check whether the url has changed or not, for making sure that the variant is changed.
    let url = location.href; 
    new MutationObserver(() => {
        if (location.href !== url) {
            url = location.href;
            initialisePreOrder();
        }
    }).observe(document, {subtree: true, childList: true});
})();