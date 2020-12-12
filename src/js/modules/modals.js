const modals = () => {
    let btnPressed;
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelectorAll(closeSelector),
            windows = document.querySelectorAll('[data-modal]');
            scroll = calcScroll();

        trigger.forEach(item => {
            item.addEventListener('click', e => {
                if (e.target) {
                    e.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    item.remove();
                }

                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                })

                modal.style.display = "block";
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            })
        })

        close.forEach(cl => {
            cl.addEventListener('click', () => {
                windows.forEach(item => {
                    item.style.display = 'none';
                })

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            })
        });



        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                windows.forEach(item => {
                    item.style.display = 'none';
                })

                modal.style.display = "none";
                document.body.style.overflow = "";
                document.body.style.marginRight = `0px`;
            }

        })
    }

    function showModalByTime(selector, time) {
        setTimeout(() => {
            let display;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    display = 'block';
                }
            })

            if (!display) {
                document.querySelector(selector).style.display = 'block'
                document.body.style.overflow = "hidden";
                document.body.style.marginRight = `${scroll}px`;
            }

        }, time)
    }

    function calcScroll () {
        let div = document.createElement('div');

        div.style.width = '53px';
        div.style.height = '53px';
        div.style.overflow = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >=
                document.documentElement.scrollHeight)) {
                document.querySelector(selector).click();
            }
        })
    }

    bindModal('.button-info', '.popup-info', '.popup-info .popup-close');
    bindModal('.button-phone', '.popup-phone', '.popup-phone .popup-close');
    // showModalByTime('.popup-consultation', 6000)

}

export default modals