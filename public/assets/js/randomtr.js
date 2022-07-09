function randomize(num) {
    let tranct = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (i = 0; i < num; i++) {
        result += tranct.charAt(Math.floor(Math.random() * tranct.length));
    }
    return result;
}
// window.onload = () => {
const tbody = document.getElementsByTagName("tbody")[0];
for (let i = 0; i < 30; i++) {
    const dev = document.createElement("tr");
    dev.innerHTML =
        `
        <tr>
            <td>OS-` +
        randomize(3) +
        `${i}` +
        randomize(2) +
        `</td>
            <td>17.11.1725</td>
            <td>Mukidi blink 182</td>
            <td>
                <span class="badge badge-warning">proses</span>
            </td>
            <td>-</td>
            <td>
                <a class="btn btn-primary btn-action mr-1" data-toggle="tooltip" title="Edit"><i class="fas fa-pencil-alt"></i></a>
                <a class="btn btn-danger btn-action" data-toggle="tooltip" title="Delete" data-confirm="Are You Sure?|This action can not be undone. Do you want to continue?" data-confirm-yes="alert('Deleted')"><i class="fas fa-trash"></i></a>
            </td>
        </tr>
        `;
    tbody.appendChild(dev);
    // }
}