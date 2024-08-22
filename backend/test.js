const bcrypt = require('bcryptjs');

const plainPassword = 'test'; // Password you want to check
const storedHashedPassword = '$2a$10$RfrSUCPSvEKQ0MHO9jTthenAcUEBkTGNDxbXt7sc7fjU7gEhKt.CG'; // Hash copied from DB

bcrypt.compare(plainPassword, storedHashedPassword, (err, result) => {
    if (err) {
        console.error('Error comparing password:', err);
        return;
    }
    console.log('Password Match:', result); // Should log 'true' if the password matches
});

const newPassword = 'test';
const newHash = bcrypt.hashSync(newPassword, 10);
console.log(storedHashedPassword == newHash); // Should log 'false' as the hashes are different
console.log('New Generated Hash:', newHash);
