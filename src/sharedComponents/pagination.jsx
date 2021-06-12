import {Button} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '15px',
    }
}))

const PaginationLine = (props) => {

    const {totalPages, currentPage, setCurrentPage} = props;
    const classes = useStyles();

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    }

    const handlePrev = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNext = () => {
        if (currentPage !== totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        totalPages !== 0 &&
        <div className={classes.pagination} style={{direction: 'ltr'}}>
            <Button onClick={handlePrev} disabled={currentPage === 1}>
                הקודם
            </Button>
            <Pagination
                hideNextButton hidePrevButton siblingCount={0}
                count={totalPages} page={currentPage} size={"large"}
                onChange={handlePageChange} color={"secondary"}
            />
            <Button onClick={handleNext} disabled={currentPage === totalPages}>
                הבא
            </Button>
        </div>
    )
}

export default PaginationLine;
