const accordion = (triggerSelector) => {
    const btns = document.querySelectorAll(triggerSelector);

    btns.forEach(btn => {
        btn.addEventListener('click',  function() {
            btns.forEach(bt => {
                if (bt !== this === bt.classList.contains('active-style')) {
                    bt.classList.remove('active-style');
                    bt.nextElementSibling.classList.remove('active');
                    bt.nextElementSibling.style.maxHeight = "0px";
                }
            });

                this.classList.toggle('active-style');
                this.nextElementSibling.classList.toggle('active');

            if (this.classList.contains('active-style')) {

                this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + "px";
            } else {
                this.nextElementSibling.style.maxHeight = "0px";
            }
        });
    });

};

export default accordion;