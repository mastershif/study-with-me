import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const GroupOccupancyStatus = (props) => {

    const {currentGroupSize, maxGroupSize} = props;

    if (maxGroupSize === 0) { return false; }

    let num = (currentGroupSize / maxGroupSize) * 100;

    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant={"determinate"} color="secondary" value={num} />
            <Box top={0} left={0} bottom={0} right={0} position="absolute"
                 display="flex" alignItems="center" justifyContent="center">
                <Typography variant="caption" component="div" color="secondary">
                    {`${currentGroupSize}/${maxGroupSize}`}
                </Typography>
            </Box>
        </Box>
    );
}

export default GroupOccupancyStatus;
