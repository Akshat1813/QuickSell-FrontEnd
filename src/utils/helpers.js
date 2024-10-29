export const getInitials = (name) => {
    return name.split(" ").map((word) => word[0]).join("").toUpperCase();
  };
  
  export const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };
  