import {useDispatch} from "react-redux";

const Application = ({application}) => {
    const {id,name,surname} = application

    return (
        <div>
            <div>{id}</div>
            <div>{name}</div>
            <div>{surname}</div>

        </div>
    );
};

export {Application};