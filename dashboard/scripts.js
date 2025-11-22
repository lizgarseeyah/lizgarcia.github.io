// State to track if the chat window is currently open
let isChatOpen = false;

/**
 * Toggles the visibility of the AI Assistant Chat Window
 * Controls the slide/fade animation and icon switching.
 */
function toggleChat() {
    const chatWindow = document.getElementById('chat-window');
    const iconOpen = document.getElementById('icon-open');
    const iconClose = document.getElementById('icon-close');
    
    // Flip the state
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        // SHOW CHAT
        chatWindow.classList.remove('hidden');
        
        // Small delay allows the display:block to apply before we trigger the CSS transition
        setTimeout(() => {
            chatWindow.classList.add('chat-enter-active');
            chatWindow.classList.remove('chat-exit-active');
        }, 10);
        
        // Switch Icons
        iconOpen.classList.add('hidden');
        iconClose.classList.remove('hidden');
        
    } else {
        // HIDE CHAT
        chatWindow.classList.add('chat-exit-active');
        chatWindow.classList.remove('chat-enter-active');
        
        // Wait for the 200ms CSS transition to finish before hiding the element entirely
        setTimeout(() => {
            chatWindow.classList.add('hidden');
        }, 200);
        
        // Switch Icons
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
    }
}