// Register Admin
const registerAdmin = async (req, res) => {
  console.log("✅ registerAdmin controller hit!"); // Check if the function is called

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("❌ Missing username or password");
      return res.status(400).json({ error: "Username and password are required." });
    }

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("❌ Username already exists");
      return res.status(400).json({ error: "Username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    console.log("✅ Admin registered successfully");
    res.status(201).json({ message: "✅ Admin registered successfully!" });
  } catch (err) {
    console.error("❌ Registration Error:", err.message);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  console.log("✅ loginAdmin controller hit!"); // Check if the function is called

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      console.log("❌ Missing username or password");
      return res.status(400).json({ error: "Username and password are required." });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log("❌ Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(400).json({ error: "Invalid credentials." });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    console.log("✅ Admin logged in successfully");
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};

// Protected Route Example (Dashboard)
const getDashboard = (req, res) => {
  console.log("✅ getDashboard controller hit!"); // Check if the function is called
  res.json({ message: "✅ Welcome to Admin Dashboard!" });
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getDashboard,
};
