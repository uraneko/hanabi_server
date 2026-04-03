pub struct Account {
    general: General,
    email: Email,
    security: Security, 
}

pub struct General {
    profile_picture: Vec<u8>,
    user_name: Vec<u8>,
    
}

pub struct Email {
    email_address: Vec<u8>,
    change_address: u8,
    add_address: u8.
    use_email_communications: bool,
}

pub struct Security {
    reset_password: u8,
}
