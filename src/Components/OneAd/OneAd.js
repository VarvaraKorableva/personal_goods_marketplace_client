function OneAd({item}) {
    return(
        <li>
            <p>{item.title}</p>
            <p>{item.description}</p>
            <p>{item.price}</p>

        </li>
    )
}

export default OneAd;