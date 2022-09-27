import { useEffect } from "react";
import io from "socket.io-client";

const [socket] = useState(() => io(':8000'));