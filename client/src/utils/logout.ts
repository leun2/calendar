export function logout(navigate: (path: string) => void, redirectUrl = "/signin") {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
    navigate(redirectUrl);
}