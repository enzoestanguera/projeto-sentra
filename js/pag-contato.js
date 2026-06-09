document.addEventListener("DOMContentLoaded", () => {
    const formContact = document.querySelector('.form-contact');
    const contactModal = document.getElementById('contactModal');
    const modalIcon = contactModal.querySelector('.contact-modal-icon');
    const modalTitle = contactModal.querySelector('.contact-modal-title');
    const modalText = contactModal.querySelector('.contact-modal-text');

    formContact.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.querySelector('.input-message').value.trim();

        /*MODAL DE ERRO*/
        if (name === '' || email === '' || message === '') {
            contactModal.classList.remove('success');
            contactModal.classList.add('error');

            modalIcon.className = 'fa-solid fa-circle-xmark contact-modal-icon';
            modalTitle.textContent = 'Preencha todos os campos';
            modalText.textContent = 'Antes de enviar, informe seu nome, e-mail e mensagem.';

            contactModal.classList.add('active');

            setTimeout(() => {
                contactModal.classList.remove('active');
            }, 2000);

            return;
        }

        /*MODAL DE SUBMIT*/
        contactModal.classList.remove('error');
        contactModal.classList.add('success');

        modalIcon.className = 'fa-solid fa-circle-check contact-modal-icon';
        modalTitle.textContent = 'Mensagem enviada!';
        modalText.textContent = 'Recebemos sua mensagem e entraremos em contato em breve.';

        contactModal.classList.add('active');
        formContact.reset();

        setTimeout(() => {
            contactModal.classList.remove('active');
        }, 2000);
    });
});