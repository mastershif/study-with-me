import {Checkbox, ListItemText, MenuItem, OutlinedInput, Select} from "@material-ui/core";


const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const purposes = ['למידה למבחן', 'חזרה על החומר', 'להתרכז ביחד', 'אחר'];

const MultiSelect = (props) => {

    const {groupPurpose, handleMultiSelect} = props;

    return (
        <Select
            multiple value={groupPurpose}
            onChange={handleMultiSelect} input={<OutlinedInput />} margin={"dense"}
            renderValue={(selected) => {return selected.join(', ')}}
            MenuProps={MenuProps} variant={"standard"}
        >
            {purposes.map((name) => (
                <MenuItem key={name} value={name}>
                    <Checkbox checked={groupPurpose.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                </MenuItem>
            ))}
        </Select>
    )
}

export default MultiSelect;
