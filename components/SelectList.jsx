import { useState } from "react"

export default function SelectList ({ options, callback, ...rest }){
    const [isActive, setIsActive] = useState(false)
    const [isSelected, setIsSelected] = useState('Escolha uma opção...');

    function handleSetOption (e) {
        const optionText = e.currentTarget.innerText;
        const optionValue = e.currentTarget.getAttribute('value');

        callback(optionValue)
        setIsSelected(optionText);
        setIsActive(false);
    }

    return (
        <div className="select__list" { ...rest }>
            <span onClick={() => setIsActive(!isActive)} className="__selected">{ isSelected }</span>

            <ul className={`__list ${isActive ? 'active':''}`}>
                {
                    options && options.map(option => (
                        <li onClick={handleSetOption} className="__item" value={ option.value }>{ option.text }</li>
                    ))
                }
            </ul>

            <style jsx>{`
                .select__list {
                    position: relative;
                    display: flex;
                    border-radius: 5px;
                    background: #2c2f33;
                    z-index: 1;

                    color: white;
                    cursor: pointer;
                }

                .select__list .__selected {
                    padding: 15px;
                    width: 100%;
                }

                .select__list .__list {
                    position: absolute;
                    display: none;
                    flex-direction: column;
                    top: 0;
                    let: 0;
                    border-radius: 5px;
                    width: 100%;
                    background: #232629;
                    z-index: 2;
                }

                .select__list .__list .__item {
                    padding: 15px;
                    transition: all .2s ease;
                }

                .select__list .__list .__item:hover {
                    background: #2c2f33;
                }

                .select__list .__list .__item:last-child {
                    margin-bottom: 0;
                }

                .select__list .__list.active {
                    display: flex;
                }
            `}</style>
        </div>

    )
}