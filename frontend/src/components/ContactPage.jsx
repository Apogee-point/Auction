
function ContactPage() {
    return (
        <div style={{ backgroundColor: '#f2f2f2', padding: '20px' }}>
            <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" required style={{ width: '100%', padding: '12px 20px', margin: '8px 0', boxSizing: 'border-box', border: '2px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required style={{ width: '100%', padding: '12px 20px', margin: '8px 0', boxSizing: 'border-box', border: '2px solid #ccc', borderRadius: '4px' }} />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" required style={{ width: '100%', padding: '12px 20px', margin: '8px 0', boxSizing: 'border-box', border: '2px solid #ccc', borderRadius: '4px' }}></textarea>

                <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '14px 20px', margin: '8px 0', border: 'none', borderRadius: '4px', cursor: 'pointer', width: '100%' }}>Send Message</button>
            </form>
        </div>
    );
}

export default ContactPage;
